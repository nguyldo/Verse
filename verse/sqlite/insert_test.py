import sqlite3
from sqlite3 import Error

def main():
    conn = None
    try:
        conn = sqlite3.connect(r"../pythonsqlite.db")
    except Error as e:
        print(e)

    unique_id = '4000'
    size = '1000' 
    post ='no post data' 
    other_post = 'no other post data' 
    info = 'no profile data'
    history = 'no profile history' 
    ad = 'no advertiser data' 
    
    if conn is not None:
        sql_insert = """INSERT INTO facebook ( id, total_size, posts, other_posts, profile_info, profile_history, advertisers ) 
                        VALUES ( ?, ?, ?, ?, ?, ?, ?);"""

        try:
            c = conn.cursor()
            with conn:
                data_tuple = (unique_id, size, post, other_post, info, history, ad)
                c.execute(sql_insert, data_tuple)
        except Error as e:
            print(e)

    else:
        print("Error! cannot create the database connection.")

if __name__ == '__main__':
    main()