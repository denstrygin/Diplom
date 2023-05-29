from flask import Flask, request, jsonify
from parser import parserDutchStyleLife, parse_response, get_semantic
from search import get_mask
from flask_cors import CORS
import pymongo
from tensorflow import keras
import tensorflow as tf

app = Flask(__name__)
CORS(app)
IMAGE_SIZE = 512
IMAGE_SEND_SIZE = 256

def db_connection():
    try:
        client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
        db = client.dutchStyleLife
    except pymongo.errors.ServerSelectionTimeoutError:
        return "Connection to Database Error"
    return db.symbol 

@app.route('/')
def hello():
    return 'Welcome to the DutchStileLife server!'

@app.route('/refresh_db')
def refresh_db():
    try: 
        exelList = parserDutchStyleLife()
        if exelList == 'Parser Error':
            return exelList
        keys, count = exelList.keys(), 0
        coll = db_connection()
        if coll == "Connection to Database Error":
            return coll
        coll.delete_many({})
        for key in keys:
            coll.insert_one({'_id': count, key: exelList[key]})
            count += 1
    except:
        return 'Error'
    return 'Success'

@app.route('/list_of_segments', methods=['GET'])
def list_of_segments():
    id = request.args.get('id')
    coll = db_connection()
    if coll == "Connection to Database Error":
        return coll
    return jsonify(parse_response(coll, id))

@app.route('/list_of_symbols', methods=['POST'])
def list_of_symbols():
    id = int(request.args.get('id'))
    coll = db_connection()
    response = []
    if coll == "Connection to Database Error":
        return coll
    for i in range(len(request.files)):
        image_file = request.files[f'file{i}']
        image_tensor = image_file.read()
        image_tensor = tf.io.decode_png(image_tensor, channels=3)
        image_tensor.set_shape([None, None, 3])
        image_tensor = tf.image.resize(images=image_tensor, size=[IMAGE_SIZE, IMAGE_SIZE])
        if id != -1:
            image_masks, image_classes = get_mask([models[id]], image_tensor)
        else:
            image_masks, image_classes = get_mask(models, image_tensor)
        image_tensor = tf.image.resize(images=image_tensor, size=[IMAGE_SEND_SIZE, IMAGE_SEND_SIZE])
        image_tensor = image_tensor.numpy().tolist()
        image_classes = get_semantic(coll, id, image_classes)
        response += [{"image": image_tensor, "image_masks": image_masks, "list_of_symbols": image_classes}]
    return jsonify(response)

if __name__ == '__main__':
    model_table = keras.models.load_model('./models/model_table')
    model_flower = keras.models.load_model('./models/model_flower')
    model_skeleton = keras.models.load_model('./models/model_skeleton')
    models = [model_table, model_flower, model_skeleton]
    app.run(debug=False, port = 5000)