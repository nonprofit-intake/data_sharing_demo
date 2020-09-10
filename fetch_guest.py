import os
import psycopg2
import json

elephant_host = os.environ.get('ELEPHANT_HOST')
elephant_user = os.environ.get('ELEPHANT_USER')
elephant_password = os.environ.get('ELEPHANT_PASSWORD')

def handler(event, context):
  try:
      try:
    conn = psycopg2.connect(host=elephant_host,
                            user=elephant_user,
                            password=elephant_password)

    query = f"select g.ssn, g.enroll_date, g.exit_date, g.income_at_entry, g.income_at_exit, g.exit_destination from guests as g where g.ssn = '{event}'"

    curs = conn.cursor()
    curs.execute(query)
    
    result = curs.fetchone()

    if result:
      result_json = {
                      "ssn": result[0],
                      "enroll_date": result[1].strftime("%Y-%m-%d"),
                      "exit_date": result[2].strftime("%Y-%m-%d"),
                      "income_at_entry": result[3],
                      "income_at_exit": result[4],
                      "exit_destination": result[5]
                    }
    else:
      result_json = { "message": "guest not found"}

    return json.dumps(result_json, indent=2)

  except (Exception, psycopg2.Error) as error:
    print("Error while fetching data from PostgreSQL:", error)

  finally:
    if (conn):
        curs.close()
        conn.close()
    