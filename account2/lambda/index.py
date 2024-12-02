import json
import os
import boto3

sns = boto3.client('sns')

def handler(event, context):
    message = event.get('message', 'No message provided')
    topic_arn = os.environ['TOPIC_ARN']

    try:
        response = sns.publish(
            TopicArn=topic_arn,
            Message=json.dumps({'message': message})
        )
        print(f"Message sent successfully. MessageId: {response['MessageId']}")
        return {
            'statusCode': 200,
            'body': json.dumps('Message sent successfully')
        }
    except Exception as e:
        print(f"Error publishing message: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps('Error sending message')
        }
