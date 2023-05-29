import pandas as pd
from search import COLORMAP

CLASSES = [
    "Фон",
    "Гусли",
    "Курительная трубка",
    "Шкатулка",
    "Меч",
    "Шлем",
    "Череп",
    "Череп с венком",
    "Книга",
    "Перевернутый вниз стакан",
    "Часы",
    "Песочные часы",
    "Ключ",
    "Пустой стакан",
    "Саквояж",
    "Потухшая свеча",
    "Морская раковина",
    "Опавший лист",
    "Медецинский инструмент",
    "Мыльный пузырь",
    "Разбитая посуда",
    "Ноты",
    "Нож",
    "Флейта",
    "Кошель",
    "Тюльпан",
    "Роза",
    "Ландыш",
    "Фиалка",
    "Лилия",
    "Гвоздика",
    "Нарцисс",
    "Ирис",
    "Вьюнок",
    "Бабочка",
    "Бокал с вином",
    "Виноград",
    "Вишня",
    "Высокий стеклянный бокал",
    "Гранат, треснутый",
    "Инжир, треснутый",
    "Кубок-наутилоса",
    "Лимон кусочком",
    "Лимон с кожурой",
    "Мясной пирог",
    "Наклоненный/пустой стакан",
    "Оливка",
    "Открытая устрица",
    "Персик, нарезанный",
    "Улитка",
    "Хлеб",
]

def parse_response(coll, id):
    if id == '-1':
        id = {}
    else:
        id = {'_id': int(id)}
    response = []
    for i in coll.find(id):
        del i['_id']
        keys = i.keys()
        for key in keys:
            skeys = list(i[key].keys())
            response += [{"name": key, "symbols": skeys}]
    return response

def get_semantic(coll, id, classes):
    if id == -1:
        id = {}
    else:
        id = {'_id': id}
    response = []
    for j in range(len(classes)):
        if classes[j] == True:
            symbol = CLASSES[j]
            for i in coll.find(id):
                del i['_id']
                styleLife = i.keys()
                for key in styleLife:
                    skeys = list(i[key].keys())
                    for skey in skeys:
                        if skey == symbol:
                            response += [{"symbol": skey, "semantic": i[key][skey], "color": COLORMAP[j]}]
    return response

def kill_NaN(arr):
    for i in range(len(arr)):
        if pd.isna(arr[i]):
            arr[i] = arr[i - 1]

def parserDutchStyleLife():
    try:
        dutchStyleLife = pd.read_excel(r'./dutchStyleLife.xlsx', sheet_name='Лист1')
        breakpoint = -1
        result = {}
        kill_NaN(dutchStyleLife['Значения'])
        for i in range(len(dutchStyleLife['Жанры натюрмортов'])):
            if not(pd.isna(dutchStyleLife['Жанры натюрмортов'][i])):
                key = dutchStyleLife['Жанры натюрмортов'][i]
                if breakpoint != -1:
                    result[dutchStyleLife['Жанры натюрмортов'][breakpoint]] = dict(zip(dutchStyleLife['Сегменты'][breakpoint:i].to_list(), dutchStyleLife['Значения'][breakpoint:i].to_list()))
                breakpoint = i
        else:
            result[key] = dict(zip(dutchStyleLife['Сегменты'][breakpoint:i + 1].to_list(), dutchStyleLife['Значения'][breakpoint:i + 1].to_list()))
        return result
    except: 
        return 'Parser Error'

if __name__ == "__main__":
    print(parserDutchStyleLife())