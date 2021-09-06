module.exports = function (app) {
    var trainingTitlePrefixes = [
        'Mandatory',
        'Obligatory',
        'Q1',
        'Q2',
        'Q3',
        'Q4',
        'Annual',
        'Semi-Annual',
        'Quarterly',
        'Regular'
    ];
    var trainingTitlePostfixes = [
        'Attestation',
        'Training',
        'Confirmation'
    ];
    var trainingTitleMid = [
        'Mental Health',
        'Financial Crime',
        'Cyber Security',
        'Diversity And Inclusion',
        'Money Laundering',
        'Private Investments',
        'Terrorist Funding',
        'Office Safety',
        'Work-Life Balance',
        'Company Values',
    ];

    var pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    var getTrainingTitle = () => {
        return pickRandom(trainingTitlePrefixes) + ' ' + pickRandom(trainingTitleMid) + ' ' + pickRandom(trainingTitlePostfixes);
    };

    var generateNewTrainings = (cnt) => {
        var result = [];
        for (var i = 0; i < cnt; ++i) {
            result.push({
                'title': getTrainingTitle(),
                'minNewTrainings': Math.floor(Math.random() * 3),
                'maxNewTrainings': Math.floor(Math.random() * 7)
            });
        }
        return result;
    }

    app.use('/trainings', (req, res) => {
        var left = req.query.trainingsLeft;
        var min = req.query.minNewTrainings;
        var max = req.query.maxNewTrainings;
        if (min === undefined) {
            min = 2;
        }
        if (max === undefined) {
                max = 5;
            }

        if (left == 0) {
            res.end(JSON.stringify({ 'password': 'respect' }));
        } else {
            var rnd = Math.random();
            var tmp = Number(min) + rnd * (max - min);
            var newTrainingsCount = Math.floor(tmp);
            var newTrainings = generateNewTrainings(newTrainingsCount);
            res.end(JSON.stringify({ 'newTrainings': newTrainings }));
        }
    });
};