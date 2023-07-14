import moment from 'moment';

import db from './db';

const formatRes = (res, error) => {
  const result = {
    success: !error,
  };

  if (error) {
    result.error = error;
  }

  if (res) {
    result.data = res;
  }

  return result;
};

export const addTask = async (task) => {
  return new Promise((resolve, reject) => {
    db.tasks.add(task)
      .then(() => {
        resolve(formatRes());
      })
      .catch((error) => {
        reject(formatRes(null, error));
      });
  });
}

export const getTasksByProject = async (projectId) => {
  return new Promise((resolve, reject) => {
    db.tasks.where('projectId').equals(projectId).toArray()
      .then((tasks) => {
        resolve(formatRes(tasks));
      })
      .catch((error) => {
        reject(formatRes(null, error));
      });
  });
}

export const getTaskInbox = async () => {
  return new Promise((resolve, reject) => {
    db.tasks.where('date').equals('').toArray()
      .then((tasks) => {
        resolve(formatRes(tasks));
      })
      .catch((error) => {
        reject(formatRes(null, error));
      });
  });
}

export const getTasksByDate = async (date) => {
  return new Promise((resolve, reject) => {
    db.tasks.where('date').equals(date).toArray()
      .then((tasks) => {
        resolve(formatRes(tasks));
      })
      .catch((error) => {
        reject(formatRes(null, error));
      });
  });
}

export const getTasksNext7Days = async () => {
  return new Promise((resolve, reject) => {
    const today = moment().format('DD/MM/YYYY');
    const next7Days = moment().add(7, 'days').format('DD/MM/YYYY');

    db.tasks.where('date').between(today, next7Days, { includeLower: true, includeUpper: true }).toArray()
      .then((tasks) => {
        resolve(formatRes(tasks));
      })
      .catch((error) => {
        reject(formatRes(null, error));
      });
  });
}

export const deleteTask = async (id) => {
  return new Promise((resolve, reject) => {
    db.tasks.delete(id)
      .then(() => {
        resolve(formatRes());
      })
      .catch((error) => {
        reject(formatRes(null, error));
      });
  });
}

export const updateTask = async (id, task) => {
  return new Promise((resolve, reject) => {
    db.tasks.update(id, task)
      .then(() => {
        resolve(formatRes());
      })
      .catch((error) => {
        reject(formatRes(null, error));
      });
  });
}

export const addProject = async (project) => {
  return new Promise((resolve, reject) => {
    db.projects.add(project)
      .then(() => {
        resolve(formatRes());
      })
      .catch((error) => {
        reject(formatRes(null, error));
      });
  });
}

export const getProjects = async () => {
  return new Promise((resolve, reject) => {
    db.projects.toArray()
      .then((projects) => {
        resolve(formatRes(projects));
      })
      .catch((error) => {
        reject(formatRes(null, error));
      });
  });
}

export const deleteProject = async (id) => {
  return new Promise((resolve, reject) => {
    db.projects.delete(id)
      .then(() => {
        resolve(formatRes());
      })
      .catch((error) => {
        reject(formatRes(null, error));
      });
  });
}