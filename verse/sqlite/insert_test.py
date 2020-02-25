import sqlite3
from sqlite3 import Error

def main():
    conn = None
    try:
        conn = sqlite3.connect(r"pythonsqlite.db")
    except Error as e:
        print(e)
    
    if conn is not None:
        sql_insert = """INSERT INTO facebook ( id, total_size, posts, other_posts, profile_info, advertisers ) 
                        VALUES ( '1', 
                                '1000', 
                                'no post data', 
                                'no other post data', 
                                'no profile data', 
                                'no advertiser data' 
                        );"""

        try:
            c = conn.cursor()
            with conn:
                c.execute(sql_insert)
        except Error as e:
            print(e)

    else:
        print("Error! cannot create the database connection.")

if __name__ == '__main__':
    main()