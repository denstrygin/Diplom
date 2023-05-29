import tensorflow as tf
import numpy as np

COLORMAP = [
    [0, 0, 0],
    [0, 113, 188],
    [216, 82, 24],
    [236, 176, 31],
    [125, 46, 141],
    [118, 171, 47],
    [161, 19, 46],
    [255, 0, 0],
    [255, 127, 0],
    [190, 190, 0],
    [ 0, 255, 0],
    [0, 0, 255],
    [170, 0, 255],
    [84, 84, 0],
    [84, 255, 0],
    [170, 84, 0],
    [170, 170, 0],
    [170, 255, 0],
    [255, 84, 0],
    [255, 170, 0],
    [255, 255, 0],
    [0, 84, 127],
    [0, 170, 127],
    [0, 255, 127],
    [84, 0, 127],
    [255, 106, 77],
    [250, 50, 83],
    [170, 240, 209],
    [140, 120, 240],
    [223, 236, 236],
    [253, 156, 204],
    [244, 244, 60],
    [91, 85, 144],
    [158, 158, 244],
    [240, 120, 240],
    [97, 7, 38],
    [131, 224, 112],
    [211, 0, 42],
    [15, 209, 123],
    [255, 0, 74],
    [228, 148, 95],
    [255, 204, 51],
    [197, 197, 0],
    [250, 250, 55],
    [204, 153, 51],
    [51, 221, 255],    
    [46, 160, 46],
    [61, 61, 245],
    [255, 204, 51],
    [102, 80, 207],
    [150, 85, 23],
]

def infer(model, image_tensor):
    predictions = model.predict(np.expand_dims((image_tensor), axis=0))
    predictions = np.squeeze(predictions)
    predictions = np.argmax(predictions, axis=2)
    return predictions

def get_classes(prediction_mask, classes):
    for i in prediction_mask:
        for j in i:
            classes[j] = True
    return classes

def decode_segmentation_masks(mask):
    r = np.zeros_like(mask).astype(np.uint8)
    g = np.zeros_like(mask).astype(np.uint8)
    b = np.zeros_like(mask).astype(np.uint8)
    for l in range(0, len(COLORMAP)):
        idx = mask == l
        r[idx] = COLORMAP[l][0]
        g[idx] = COLORMAP[l][1]
        b[idx] = COLORMAP[l][2]
    rgb = np.stack([r, g, b], axis=2)
    rgb = tf.convert_to_tensor(rgb, dtype=tf.float32)
    rgb = tf.image.resize(rgb, [256, 256], method='nearest')
    return rgb

def get_mask(models, image_tensor):
    classes, mask = np.zeros(len(COLORMAP), dtype=bool), []
    image_tensor = tf.keras.applications.resnet50.preprocess_input(image_tensor)
    for model in models:
        prediction_mask = infer(image_tensor=image_tensor, model=model)
        classes = get_classes(prediction_mask, classes)
        mask += [decode_segmentation_masks(prediction_mask).numpy().tolist()]
    return mask, classes