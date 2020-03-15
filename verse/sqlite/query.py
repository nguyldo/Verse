import sqlite3 as lite

def main():
    conn = lite.connect('../pythonsqlite.db')
    cur = conn.cursor()
    with conn:
        cur.execute("SELECT * FROM facebook")
        print(cur.fetchall())

if __name__ == '__main__':
    main()