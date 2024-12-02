#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SnsStack } from '../lib/sns-stack';

// Configuration
const account1 = '643088008799'; // SNS stack
const account2 = '211125376231'; // Lambda stack
const subscriberEmail = 'mjheitland@gmail.com'; // e-mail of the SNS topic subscriber
const region = 'eu-central-1'; // deployment region

// Main app
const app = new cdk.App();

// Deploy the SNS stack in account1
new SnsStack(app, 'SnsStack', {
  env: { account: account1, region: region },
  lambdaAccount: account2, 
  subscriberEmail: subscriberEmail
});
