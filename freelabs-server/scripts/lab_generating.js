var Lab = require('../models/mongo/lab.model');
var UserProfile = require('../models/mongo/user-profile.model');
var labPromises = [];

module.exports = function (req, res) {
    UserProfile.findOne({ username: 'admin' })
        .then(function (admin) {
            for (let i = 0; i < 500; i++) {
                let subject = generateSubject();
                let description = generateDescriptionBySubjectAndNumber(subject, i+1);
                let lab = new Lab({
                    name: 'Лабораторна робота №' + (i + 1),
                    author: admin,
                    subject: subject,
                    description: description,
                    proposals: [],
                    status: 0,
                    endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                }, { shardKey: { subject: 1 }});
                lab.save();
                console.log('saved: ' + i);
            }
        }).catch(function(err) {
            return res.json({ error: err})
        });
}



subjectMap = {
    0:'Чисельні методи',
    1:'Бази даних',
    2:'Математичний аналіз',
    3:'Комп\'ютерна логіка',
    4:'Історія української культури',
    5:'Моделювання ПЗ',
    6:'Лінійна алгебра',
    7:'Математична статистика',
    8:'Архітектура комп\'ютера',
    9:'Об\'єктно-орієнтоване програмування',
    10:'Основи програмування',
    11:'Історія України',
    12:'Фізика'
};

function generateSubject() {
    let subjectCount = 12;
    return Math.floor(Math.random() * subjectCount);
}

function generateDescriptionBySubjectAndNumber(subject, n) {
    return 'Цікава лабораторна робота № ' + n + ' з предмету ' + subjectMap[subject];


}