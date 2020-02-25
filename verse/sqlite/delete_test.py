import sqlite3 as lite

conn = lite.connect('pythonsqlite.db')
cur = conn.cursor()

def main():
    with conn:
        cur.execute("DELETE FROM facebook")

if __name__ == '__main__':
    main()