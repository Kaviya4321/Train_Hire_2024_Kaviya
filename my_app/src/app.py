from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from database import get_db_connection  # Import the get_db_connection function

app = Flask(__name__)
CORS(app)

@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    conn=get_db_connection()
    c = conn.cursor()
    c.execute("SELECT * FROM inventory")
    items = c.fetchall()
    inventory_list = [dict(row) for row in items]
    return jsonify(inventory_list)
@app.route('/api/inventory', methods=['POST'])
def add_inventory():
    data = request.get_json()
    conn=get_db_connection()
    c = conn.cursor()
    c.execute('''
            INSERT INTO inventory (date_of_purchase, category, product_code, product_name, price, warranty_date, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (data['date_of_purchase'], data['category'], data['product_code'], data['product_name'], data['price'], data['warranty_date'], data['status']))
    conn.commit()
    return jsonify({'status': 'success'}), 201

@app.route('/api/inventory/<int:id>', methods=['PUT'])
def update_inventory(id):
    data = request.get_json()
    conn=get_db_connection()
    c = conn.cursor()
    c.execute('''
            UPDATE inventory
            SET date_of_purchase = ?, category = ?, product_code = ?, product_name = ?, price = ?, warranty_date = ?, status = ?
            WHERE id = ?
        ''', (data['date_of_purchase'], data['category'], data['product_code'], data['product_name'], data['price'], data['warranty_date'], data['status'], id))
    conn.commit()
    return jsonify({'status': 'success'}), 200

@app.route('/api/inventory/<int:id>', methods=['DELETE'])
def delete_inventory(id):
    conn=get_db_connection()
    c = conn.cursor()
    c.execute("DELETE FROM inventory WHERE id = ?", (id,))
    conn.commit()
    return jsonify({'status': 'success'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)

