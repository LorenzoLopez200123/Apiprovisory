const express = require('express');
const moment = require('moment');
const cors = require('cors');

const app = express();
const events = [
  {
    id: 2,
    owner: 'userIdMatchMaker',
    subject: 'Subject de la charla',
    description: 'lorem ipsum description',
    roomID: '60180a29bc1d71f55f49915a',
    startDate: moment().toDate(),
    endDate: moment().add(moment.duration('00:30')).toDate(),
    assistants: ['60180a29bc1d71f55f49915a'],
    eventType: 'Interview',
    createDate: moment().toDate(),
    changeLog: [],
    status: 'Active',
  },
  {
    id: 3,
    owner: 'userIdMatchMaker',
    subject: 'Charla acerca de algo',
    description: 'ni idea',
    roomID: '601db9361619252d7ad57b62',
    startDate: moment().add(moment.duration('00:30')).toDate(),
    endDate: moment().add(moment.duration('01:00')).toDate(),
    assistants: ['601db9361619252d7ad57b62'],
    eventType: 'Interview',
    createDate: moment().toDate(),
    changeLog: [],
    status: 'Active',
  },
  {
    id: 4,
    owner: 'userIdMatchMaker',
    subject: 'Charla acerca de CarpeDm',
    description: 'otro',
    roomID: '601db9361619252d7ad57b62',
    startDate: moment().add(moment.duration('01:30')).toDate(),
    endDate: moment().add(moment.duration('02:00')).toDate(),
    assistants: ['601db9361619252d7ad57b62'],
    eventType: 'Interview',
    createDate: moment().toDate(),
    changeLog: [],
    status: 'Active',
  },
  {
    id: 5,
    owner: 'userIdMatchMaker',
    subject: 'Charla acerca de algo2',
    description: 'ni idea',
    roomID: 'userId',
    startDate: moment().add(moment.duration(2, 'days')).toDate(),
    endDate: moment()
      .add(moment.duration(2, 'days'))
      .add(moment.duration('00:30'))
      .toDate(),
    assistants: ['60235bf3846044877f6fd517'],
    eventType: 'Interview',
    createDate: moment().toDate(),
    changeLog: [],
    status: 'Active',
  },
  {
    id: 6,
    owner: 'userIdMatchMaker',
    subject: 'Charla acerca de algo',
    description: 'ni idea',
    roomID: 'userId',
    startDate: moment().add(moment.duration(5, 'days')).toDate(),
    endDate: moment()
      .add(moment.duration(5, 'days'))
      .add(moment.duration('00:30'))
      .toDate(),
    assistants: ['60235bf3846044877f6fd517'],
    eventType: 'Interview',
    createDate: moment().toDate(),
    changeLog: [],
    status: 'Active',
  },
  {
    id: 7,
    owner: 'userIdMatchMaker',
    subject: 'Charla acerca de CarpeDm',
    description: 'otro',
    roomID: 'userId',
    startDate: moment().add(moment.duration(3, 'days')).toDate(),
    endDate: moment()
      .add(moment.duration(3, 'days'))
      .add(moment.duration('00:30'))
      .toDate(),
    assistants: [],
    eventType: 'Interview',
    createDate: moment().toDate(),
    changeLog: [],
    status: 'Active',
  },
];

app.set('port', process.env.PORT || 8080);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/api/mock/getAllEvent/', (req, res) => {
  res.status(200).json(events);
});

app.get('/api/mock/getEvent/:id', (req, res) => {
  const { id } = req.params;
  const item = events.find((el) => el.id === id);
  item
    ? res.status(200).json(item)
    : res.status(404).json({ message: 'revisame el id master' });
});

app.post('/api/mock/addEvent', (req, res) => {
  const item = req.body;
  console.log(moment().toDate());
  const propsDefault = {
    createDate: moment().toDate(),
    changeLog: [],
    status: 'Active',
  };
  const newItem = {
    id: events.length + 1,
    ...item,
    ...propsDefault,
  };
  events.push(newItem);
  res.json({ message: 'Item added master' });
});

app.post('/api/mock/editEvent/:id', (req, res) => {
  const { id } = req.params;
  const newProps = req.body;
  const item = events.findIndex((el) => el.id == id);
  if (item > -1) {
    const eventOld = events[item];
    events[item] = {
      ...eventOld,
      ...newProps,
    };
    res.status(200).json({ message: 'Item editado crack' });
  } else {
    res.status(404).json({ message: 'Item no encontrado :(' });
  }
});

const server = app.listen(app.get('port'), () => {
  console.log(`Server on http://localhost:${app.get('port')}`);
});

server.on('error', () => {
  console.log('LA manqueaste pa');
});
