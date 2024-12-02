#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from '../lib/lambda-stack';

// Configuration
const account1 = '643088008799'; // SNS stack
const account2 = '211125376231'; // Lambda stack
const region = 'eu-central-1'; // deployment region
const snsTopicArn = 'arn:aws:sns:' + region + ':' + account1 + ':cloudformation-notifications';

const app = new cdk.App();

// Deploy the Lambda stack in account2
new LambdaStack(app, 'LambdaStack', {
  env: { account: account2, region: region },
  snsTopicArn: snsTopicArn,
});