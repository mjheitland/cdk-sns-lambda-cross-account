import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

interface LambdaStackProps extends cdk.StackProps {
  snsTopicArn: string; // The ARN of the SNS topic in the other account where we want to send messages to
}

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    // Create the Lambda function
    const customMessageLambda = new lambda.Function(this, 'CustomMessageLambda', {
      functionName: 'custom-message-lambda',
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'), // Path to Lambda code
      environment: {
        TOPIC_ARN: props.snsTopicArn,
      },
      timeout: cdk.Duration.seconds(30),
    });

    // Add an IAM policy to allow publishing to the SNS topic
    customMessageLambda.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['sns:Publish'],
        resources: [props.snsTopicArn],
      })
    );

    // Output the Lambda function name
    new cdk.CfnOutput(this, 'CustomMessageLambdaName', {
      value: customMessageLambda.functionName,
      description: 'The name of the Lambda function for sending custom messages',
    });
  }
}