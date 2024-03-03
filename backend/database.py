import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

db_host = os.getenv("DB_HOST", "localhost")
db_port = os.getenv("DB_PORT", "5432")
db_name = os.getenv("DB_NAME", "parking")
db_user = os.getenv("DB_USER", "postgres")
db_password = os.getenv("DB_PASSWORD", "password")

def update_parking_position(name, position, status):
    try:
        conn = psycopg2.connect(
            dbname=db_name, user=db_user, password=db_password, host=db_host, port=db_port
        )
        cursor = conn.cursor()

        update_query = f"""
            UPDATE parkings
            SET position{position} = %s
            WHERE name = %s
        """
        cursor.execute(update_query, (status, name))
        conn.commit()

        print(f"Position {position} for {name} updated to {status}")

    except (Exception, psycopg2.Error) as error:
        print("Error while updating parking position:", error)

    # finally:
    #     if conn:
    #         cursor.close()
    #         conn.close()
    #
def get_parking_values(name):
    try:
        conn = psycopg2.connect(
            dbname=db_name, user=db_user, password=db_password, host=db_host, port=db_port
        )
        cursor = conn.cursor()

        select_query = """
            SELECT * FROM parkings WHERE name = %s
        """
        cursor.execute(select_query, (name,))
        values = cursor.fetchone()

        return values

    except (Exception, psycopg2.Error) as error:
        print("Error while fetching parking values:", error)
        return None

    # finally:
    #     if conn:
    #         cursor.close()
    #         conn.close()
