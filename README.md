# Family Promise of Spokane Data Sharing API
## Project Overview
Problem: What happened to local utilities customers that fell behind on payments prior to ceasing to be customers? Many become homeless. How do we use our resources to prevent future homelessness?
Solution: An API that uses unique identifiers to determine whether an ex-customer began receiving services from service providers assisting people experiencing homelessness.
## Tech Stack
Services: AWS, Docker, Jupyter Notebooks, Postman
Languages: Python, SQL
Backend: AWS API Gateway, AWS Lambda, ElephantSQL

## Getting Started
### Prerequisites
    - SQL
    - AWS Lambda and AWS API Gateway preferred
    - PostgreSQL

### Deployment to AWS
#### Docker image
text here
#### Installing dependencies
text here
#### Packaging Lambda Function
text here

## Development
### Architecture
<img src="https://github.com/nonprofit-intake/family_promise_data_sharing/blob/dev/images/fampromarch.png" width="500" height="350">
Backend deployed serverlessly through AWS API Gateway and AWS Lambda.

### Endpoint - Return User Info

**URL**
https://3yk0fzdvdh.execute-api.us-east-1.amazonaws.com/default/return_user_info

**Description**
Returns the last name, first name, enroll date, exit date, income at entry, income at exit, and exit destination of a user in database.

**Request**
```text
```

**Response**
```{
    'complete_matches': [
        {
            'enroll_date': string,
            'exit_date': string,
            'exit_destination': string,
            'first_name': string,
            'income_at_entry': float,
            'income_at_exit': float,
            'last_name': string
        }
    ],
   'partial_matches': [
       {
           'enroll_date': string,
           'exit_date': string,
           'exit_destination': string,
           'first_name': string,
           'income_at_entry': float,
           'income_at_exit': float,
           'last_name': string
        }
    ]
}
```

#### AWS Environment Variables
```HOST = database URL
USER = username
PASSWORD = password
AUTH_PWD = secret key```
