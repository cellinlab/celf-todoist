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