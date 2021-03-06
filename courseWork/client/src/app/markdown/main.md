# Основная информация

## Авторизация 
Для авторизации на нашем сайте используется JSON web token.   
Для этого необходимо в хедеры запроса добавить поле

```Authorization : Bearer {TOKEN}```

Для более подробной информации о даном типе авторизации и как получить токен советуем прочитать статью по [ссылке](https://habr.com/ru/post/340146/)

Так как этот сервис представляет собой интернет магазин, то доступны базовые операции работы над головоломками, корзинами, пользователями и заказами.

## Формат запроса

Для запросов можно использовать как ```urlencoded``` так и ```JSON``` формат.

## Тип ошибок

__Ошибки выглядят таким образом__

```json
{
  "error": {
      "message": "Строка ошибки"
  }
}
```

- ```GET api/v1/me```

    Получить даного авторизированного пользователя

    __Пример результата__

    ```json
    {
        "role": "admin",
        "avaUrl": "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
        "isDisabled": false,
        "bio_md": "Этот пользователь пока не написал о себе ни слова",
        "orders": [],
        "friends": [],
        "_id": "5dc2fb8771e9c47a5117685a",
        "first_name": "андрей",
        "last_name": "админ",
        "login": "admin",
        "passwordHash": "Хеш =)",
        "registeredAt": "2019-11-06T16:57:43.319Z",
        "puzzles": [],
        "__v": 0
    }
    ```


Внимание, в коде присутствуют баги!
