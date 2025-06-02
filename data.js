# Данные суворовцев для лидерной таблицы

```javascript
// Данные суворовцев на основе изображений
const suvorovData = [
    // 31 взвод
    {
        id: 1,
        name: "Зуенко К.М.",
        platoon: "31",
        physicalTraining: 95,
        birthdate: "2005-03-15",
        averageScore: 4.8,
        awards: ["Поощрение начальника училища", "Отличник боевой подготовки"],
        punishments: []
    },
    {
        id: 2,
        name: "Катаев В.С.",
        platoon: "31",
        physicalTraining: 93,
        birthdate: "2005-04-22",
        averageScore: 4.7,
        awards: ["Благодарность командира взвода"],
        punishments: []
    },
    {
        id: 3,
        name: "Сережка А.Д.",
        platoon: "31",
        physicalTraining: 90,
        birthdate: "2005-05-10",
        averageScore: 4.5,
        awards: [],
        punishments: []
    },
    {
        id: 4,
        name: "Трунов Н.С.",
        platoon: "31",
        physicalTraining: 83,
        birthdate: "2005-06-12",
        averageScore: 4.2,
        awards: [],
        punishments: []
    },
    {
        id: 5,
        name: "Ниязов П.С.",
        platoon: "31",
        physicalTraining: 82,
        birthdate: "2005-07-05",
        averageScore: 4.3,
        awards: [],
        punishments: []
    },
    {
        id: 6,
        name: "Степанко М.И.",
        platoon: "31",
        physicalTraining: 80,
        birthdate: "2005-08-18",
        averageScore: 4.0,
        awards: [],
        punishments: ["Замечание по дисциплине"]
    },
    {
        id: 7,
        name: "Ельченко А.Ф.",
        platoon: "31",
        physicalTraining: 77,
        birthdate: "2005-09-27",
        averageScore: 3.9,
        awards: [],
        punishments: []
    },
    {
        id: 8,
        name: "Агупов С.Д.",
        platoon: "31",
        physicalTraining: 77,
        birthdate: "2005-10-03",
        averageScore: 3.8,
        awards: [],
        punishments: []
    },
    {
        id: 9,
        name: "Миронов Д.А.",
        platoon: "31",
        physicalTraining: 74,
        birthdate: "2005-11-15",
        averageScore: 3.7,
        awards: [],
        punishments: []
    },
    {
        id: 10,
        name: "Мальцев В.А.",
        platoon: "31",
        physicalTraining: 69,
        birthdate: "2005-12-20",
        averageScore: 3.6,
        awards: [],
        punishments: []
    },
    {
        id: 11,
        name: "Майоров Д.Э.",
        platoon: "31",
        physicalTraining: 67,
        birthdate: "2006-01-25",
        averageScore: 3.5,
        awards: [],
        punishments: []
    },
    {
        id: 12,
        name: "Потопов Г.А.",
        platoon: "31",
        physicalTraining: 66,
        birthdate: "2006-02-28",
        averageScore: 3.4,
        awards: [],
        punishments: ["Порицание Ивана Васильевича"]
    },
    {
        id: 13,
        name: "Егоров П.Ю.",
        platoon: "31",
        physicalTraining: 64,
        birthdate: "2006-03-05",
        averageScore: 3.3,
        awards: [],
        punishments: []
    },
    {
        id: 14,
        name: "Деденко М.А.",
        platoon: "31",
        physicalTraining: 62,
        birthdate: "2006-04-10",
        averageScore: 3.2,
        awards: [],
        punishments: []
    },
    {
        id: 15,
        name: "Горилов М.А.",
        platoon: "31",
        physicalTraining: 60,
        birthdate: "2006-05-15",
        averageScore: 3.1,
        awards: [],
        punishments: []
    },

    // 32 взвод
    {
        id: 16,
        name: "Алексанян А.С.",
        platoon: "32",
        physicalTraining: 88,
        birthdate: "2005-01-12",
        averageScore: 4.7,
        awards: ["Отличник боевой подготовки"],
        punishments: []
    },
    {
        id: 17,
        name: "Бабочкин В.С.",
        platoon: "32",
        physicalTraining: 85,
        birthdate: "2005-02-28",
        averageScore: 4.6,
        awards: [],
        punishments: []
    },
    {
        id: 18,
        name: "Рыночкин А.В.",
        platoon: "32",
        physicalTraining: 83,
        birthdate: "2005-03-15",
        averageScore: 4.5,
        awards: [],
        punishments: []
    },
    {
        id: 19,
        name: "Волков Е.А.",
        platoon: "32",
        physicalTraining: 81,
        birthdate: "2005-04-20",
        averageScore: 4.4,
        awards: [],
        punishments: []
    },
    {
        id: 20,
        name: "Ефремов Е.А.",
        platoon: "32",
        physicalTraining: 80,
        birthdate: "2005-05-25",
        averageScore: 4.3,
        awards: ["Поощрение начальника училища"],
        punishments: []
    },
    {
        id: 21,
        name: "Волченко А.В.",
        platoon: "32",
        physicalTraining: 79,
        birthdate: "2005-06-30",
        averageScore: 4.2,
        awards: [],
        punishments: []
    },
    {
        id: 22,
        name: "Горюшкина Н.А.",
        platoon: "32",
        physicalTraining: 76,
        birthdate: "2005-07-05",
        averageScore: 4.1,
        awards: [],
        punishments: []
    },
    {
        id: 23,
        name: "Епишкин И.В.",
        platoon: "32",
        physicalTraining: 74,
        birthdate: "2005-08-10",
        averageScore: 4.0,
        awards: [],
        punishments: []
    },
    {
        id: 24,
        name: "Мякишев О.В.",
        platoon: "32",
        physicalTraining: 71,
        birthdate: "2005-09-15",
        averageScore: 3.9,
        awards: [],
        punishments: ["Замечание по дисциплине"]
    },
    {
        id: 25,
        name: "Михайленко П.П.",
        platoon: "32",
        physicalTraining: 69,
        birthdate: "2005-10-20",
        averageScore: 3.8,
        awards: [],
        punishments: []
    },
    {
        id: 26,
        name: "Скотинкин А.Р.",
        platoon: "32",
        physicalTraining: 68,
        birthdate: "2005-11-25",
        averageScore: 3.7,
        awards: [],
        punishments: []
    },
    {
        id: 27,
        name: "Сутягин К.А.",
        platoon: "32",
        physicalTraining: 66,
        birthdate: "2005-12-30",
        averageScore: 3.6,
        awards: [],
        punishments: []
    },
    {
        id: 28,
        name: "Чертков Е.В.",
        platoon: "32",
        physicalTraining: 65,
        birthdate: "2006-01-05",
        averageScore: 3.5,
        awards: [],
        punishments: []
    },
    {
        id: 29,
        name: "Синюков А.Д.",
        platoon: "32",
        physicalTraining: 60,
        birthdate: "2006-02-10",
        averageScore: 3.4,
        awards: [],
        punishments: ["Порицание Ивана Васильевича"]
    },
    {
        id: 30,
        name: "Шпак Г.Р.",
        platoon: "32",
        physicalTraining: 59,
        birthdate: "2006-03-15",
        averageScore: 3.3,
        awards: [],
        punishments: []
    },

    // 33 взвод
    {
        id: 31,
        name: "Бородин М.Р.",
        platoon: "33",
        physicalTraining: 95,
        birthdate: "2005-01-05",
        averageScore: 4.9,
        awards: ["Отличник учебы", "Поощрение начальника училища"],
        punishments: []
    },
    {
        id: 32,
        name: "Бородин А.Р.",
        platoon: "33",
        physicalTraining: 93,
        birthdate: "2005-02-10",
        averageScore: 4.8,
        awards: ["Отличник боевой подготовки"],
        punishments: []
    },
    {
        id: 33,
        name: "Дунаева Н.С.",
        platoon: "33",
        physicalTraining: 90,
        birthdate: "2005-03-15",
        averageScore: 4.7,
        awards: [],
        punishments: []
    },
    {
        id: 34,
        name: "Бородин А.А.",
        platoon: "33",
        physicalTraining: 88,
        birthdate: "2005-04-20",
        averageScore: 4.6,
        awards: [],
        punishments: []
    },
    {
        id: 35,
        name: "Жажин С.Ю.",
        platoon: "33",
        physicalTraining: 85,
        birthdate: "2005-05-25",
        averageScore: 4.5,
        awards: [],
        punishments: []
    },
    {
        id: 36,
        name: "Елистов Н.А.",
        platoon: "33",
        physicalTraining: 80,
        birthdate: "2005-06-30",
        averageScore: 4.4,
        awards: [],
        punishments: []
    },
    {
        id: 37,
        name: "Достоевский Е.А.",
        platoon: "33",
        physicalTraining: 79,
        birthdate: "2005-07-05",
        averageScore: 4.3,
        awards: ["Поощрение начальника училища"],
        punishments: []
    },
    {
        id: 38,
        name: "Миронов Е.Е.",
        platoon: "33",
        physicalTraining: 77,
        birthdate: "2005-08-10",
        averageScore: 4.2,
        awards: [],
        punishments: []
    },
    {
        id: 39,
        name: "Хлебников И.А.",
        platoon: "33",
        physicalTraining: 70,
        birthdate: "2005-09-15",
        averageScore: 4.1,
        awards: [],
        punishments: ["Замечание по дисциплине"]
    },
    {
        id: 40,
        name: "Тряпкин Р.А.",
        platoon: "33",
        physicalTraining: 70,
        birthdate: "2005-10-20",
        averageScore: 4.0,
        awards: [],
        punishments: []
    },
    {
        id: 41,
        name: "Мурашев Н.М.",
        platoon: "33",
        physicalTraining: 67,
        birthdate: "2005-11-25",
        averageScore: 3.9,
        awards: [],
        punishments: []
    },
    {
        id: 42,
        name: "Нечаева Г.А.",
        platoon: "33",
        physicalTraining: 62,
        birthdate: "2005-12-30",
        averageScore: 3.8,
        awards: [],
        punishments: []
    },
    {
        id: 43,
        name: "Петухов М.Н.",
        platoon: "33",
        physicalTraining: 59,
        birthdate: "2006-01-05",
        averageScore: 3.7,
        awards: [],
        punishments: []
    },
    {
        id: 44,
        name: "Романов Д.А.",
        platoon: "33",
        physicalTraining: 55,
        birthdate: "2006-02-10",
        averageScore: 3.6,
        awards: [],
        punishments: ["Порицание Ивана Васильевича"]
    },
    {
        id: 45,
        name: "Суханова К.А.",
        platoon: "33",
        physicalTraining: 52,
        birthdate: "2006-03-15",
        averageScore: 3.5,
        awards: [],
        punishments: []
    },
    {
        id: 46,
        name: "Толстикова Т.Р.",
        platoon: "33",
        physicalTraining: 51,
        birthdate: "2006-04-20",
        averageScore: 3.4,
        awards: [],
        punishments: []
    },
    {
        id: 47,
        name: "Трушникова Е.Ю.",
        platoon: "33",
        physicalTraining: 50,
        birthdate: "2006-05-25",
        averageScore: 3.3,
        awards: [],
        punishments: []
    },
    {
        id: 48,
        name: "Холопов К.Н.",
        platoon: "33",
        physicalTraining: 50,
        birthdate: "2006-06-30",
        averageScore: 3.2,
        awards: [],
        punishments: []
    }
];

// Учетные данные пользователей
const users = {
    admin: {
        password: 'suvorov2024',
        role: 'admin'
    },
    user: {
        password: 'view123',
        role: 'user'
    }
};

// Экспорт данных для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { suvorovData, users };
}
```