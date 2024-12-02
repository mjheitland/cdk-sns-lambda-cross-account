import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';

interface SnsStackProps extends cdk.StackProps {
  lambdaAccount: string; // lambda account
  subscriberEmail: string; // email of the SNS topic subscriber
}

export class SnsStack extends cdk.Stack {
  public readonly topicArn: string;

  constructor(scope: Construct, id: string, props: SnsStackProps) {
    super(scope, id, props);

    // Create an SNS topic
    const topic = new sns.Topic(this, 'CloudFormationNotificationTopic', {
      topicName: 'cloudformation-notifications',
    });

    // Allow cross-account access for the Lambda in another account
    topic.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        principals: [new iam.AccountPrincipal(props.lambdaAccount)],
        actions: ['sns:Publish'],
        resources: [topic.topicArn],
      })
    );

    // Export the topic ARN for use in the Lambda stack
    this.topicArn = topic.topicArn;
    new cdk.CfnOutput(this, 'NotificationTopicArn', {
      value: this.topicArn,
      description: 'The ARN of the SNS topic for CloudFormation notifications',
    });


    // Add an e-mail subscription to the topic
    topic.addSubscription(new subscriptions.EmailSubscription(props.subscriberEmail));  }
}