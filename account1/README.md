# SNS stack in account 1 with an email subscriber

It creates the following resources:
- SNS topic
- SNS policy to allow lambda in another account to publish to the SNS topic in this account
- SNS subscriptions

## Deployment

```bash
cdk bootstrap --profile mjheitland
npm install
npm run build
npx cdk deploy --profile mjheitland
```

## Teardown

```bash
npx cdk destroy
```
