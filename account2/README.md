# Lambda stack in account 2 to send a notification to SNS topic in account 1

It creates the following resources:
- lambda
- IAM role for lambda with AWSLambdaBasicExecutionRole policy (for CloudWatch logging) and sns:Publish policy
```bash
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Action": "sns:Publish",
			"Resource": "arn:aws:sns:eu-central-1:643088008799:cloudformation-notifications",
			"Effect": "Allow"
		}
	]
}
```

## Deployment

```bash
cdk bootstrap --profile michaeljheitland
npm install
npm run build
npx cdk deploy --profile michaeljheitland
```

## Test

In AWS console, call lambda test with event
```bash
{
  "message": "2 Dec, 10:25",
  "key2": "value2"
}
```

## Teardown

```bash
npx cdk destroy
```
