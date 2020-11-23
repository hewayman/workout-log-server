module.exports = (sequelize, DataTypes) => {
  const WorkoutLog = sequelize.define('workoutLog', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    definition: {
      type: DataTypes.STRING,
      allowNull: false
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
  return WorkoutLog;
}