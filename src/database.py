import sqlite3

def get_db_connection():
    conn = sqlite3.connect('inventory.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn=get_db_connection()
    c = conn.cursor()
    c.execute('''
            CREATE TABLE IF NOT EXISTS inventory (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date_of_purchase TEXT,
                category TEXT,
                product_code TEXT,
                product_name TEXT,
                price REAL,
                warranty_date TEXT,
                status TEXT
            )
        ''')


if __name__ == '__main__':
    init_db()
    print("Database initialized with the inventory table.")

