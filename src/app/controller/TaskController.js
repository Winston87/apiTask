import validaTask from '../exceptions/ExceptionsError';
import Task from '../model/Task';


class TaskController {


    async index(req, res) {

        const tasks = await Task.findAll({
            where: { user_id: req.userId, check: false}
        })

        return res.json(tasks);
    }

    async store(req, res) {

        validaTask.validarCaposTask(req,res);
        const { task } = req.body;

        const tasks = await Task.create({

            user_id:  req.userId,
            task
        });

        return res.json(tasks);
    }


    async update(req, res) {

        const { task_id } = req.params;

        const tasks = await Task.findByPk(task_id);

        validaTask.verificarUserTask(tasks, res);

        await tasks.update(req.body);

        return res.json(tasks);

    }


    async delete(req, res) {

        const { task_id } = req.params;


        const tasks = await Task.findByPk(task_id);

        validaTask.verificarUserTask(tasks,  res);
        validaTask.verificarUserId(tasks.user_id, req.userId, res)

        await tasks.destroy();

        return res.send();
    }
}

export default new TaskController();
