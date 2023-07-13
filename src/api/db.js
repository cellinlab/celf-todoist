import Dexie from 'dexie';

const db = new Dexie('Todoist');

db.version(1).stores({
  tasks: `++id, archived, projectId, task, date`,
  projects: `&projectId, name`,
});

export default db;
