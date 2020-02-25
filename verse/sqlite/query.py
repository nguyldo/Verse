import sqlite3 as lite

conn = lite.connect('pythonsqlite.db')
cur = conn.cursor()

def main():
    with conn:
        cur.execute("SELECT * FROM facebook")
        print(cur.fetchall())

if __name__ == '__main__':
    main()