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

export const getTasks = async () => {
  return new Promise((resolve, reject) => {
    db.tasks.toArray()
      .then((tasks) => {
        resolve(formatRes(tasks));
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