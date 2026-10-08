from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os

app = Flask(__name__)
CORS(app)

###################################
# db helpers
###################################

def get_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )


def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            senha VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            nome VARCHAR(150) NOT NULL
        )
    """)

    conn.commit()
    cursor.close()
    conn.close()


###################################
# app endpoints
###################################

@app.route('/')
def hello():
    return "Aplicação funcionando"

@app.route('/users', methods=['POST'])
def insert_user():
    data = request.get_json()


    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO users (name, email) VALUES (%s, %s) RETURNING id
    """,(data["name"], data["email"]))

    user_id = cursor.fetchone()[0]

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"id": user_id, "name": data["name"], "email": data["email"]})

@app.route('/login', methods=['POST'])
def login():
    request_data = request.get_json()

    with get_connection() as conn:
        with conn.cursor() as cursor:
            try:
                cursor.execute("""
                    SELECT senha FROM users WHERE email=%s
                """, (request_data["email"],))
                db_data = cursor.fetchall()
            except Exception as e:
                print(e)
                db_data = False

        if not db_data:
            return jsonify({
                "status": "failed",
                "email": request_data["email"]
            })
        if request_data["senha"] == db_data[0][0]:
            return jsonify({
                "status": "success",
                "email": request_data["email"]
            })
        return jsonify({
            "status": "failed",
            "email": request_data["email"]
        })

@app.route('/cadastro', methods=['POST'])
def cadastro():
    request_data = request.get_json()

    with get_connection() as conn:
        with conn.cursor() as cursor:
            try:
                cursor.execute("""
                    INSERT INTO users (nome, email, senha) VALUES (%s, %s, %s)
                    """,
                    (request_data['nome'], request_data['email'], request_data['senha'])
                )
                conn.commit()
            except:
                return jsonify({
                    'status': 'failed',
                    'error_message': 'database_error'
                })
    return jsonify({
        'status': 'success'
    })


if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)