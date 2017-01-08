var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;
var keygen = require("keygenerator");

var subjectMap = {
    'Чисельні методи': 0,
    'Бази даних': 1,
    'Математичний аналіз': 2,
    'Комп\'ютерна логіка': 3,
    'Історія української культури': 4,
    'Моделювання ПЗ': 5,
    'Лінійна алгебра': 6,
    'Математична статистика': 7,
    'Архітектура комп\'ютера': 8,
    'Об\'єктно-орієнтоване програмування': 9,
    'Основи програмування': 10,
    'Історія України': 11,
    'Фізика': 12
};

var statusMap = {
    'new': 0,
    'working': 1,
    'closed': 2
};
var labSchema = new Schema({
    id: String,
    name: String,
    author: {
        type: Number,
        ref: 'UserProfile'
    },
    subject: Number,
    description: String,
    proposals: [{type: Number, ref: 'ProposalSchema'}],
    status: Number,
    endDate: Date
});
labSchema.plugin(mongoosePaginate);
labSchema.pre('save', function(next) {
    this.id = keygen._();
    next();
});

var Lab = mongoose.model('Lab', labSchema);

module.exports = Lab;