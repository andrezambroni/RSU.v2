const Group = require("../models/Group");
// const User = require("../models/Users");

exports.createGroup = async (req, res) => {
  try {
    const group = await new Group(req.body).save();
    res.json(group);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllGroups = async (req, res) => {
  console.log('passando por aqui')
  try {
    const groups = await Group.find();
    console.log('retornando', groups)
    res.json(groups);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.joinGroup = async (req, res) => {
  try {
    const { id: groupId } = req.params;
    const { id: userId } = req.user;

    // Verifica se o usuário já está no grupo
    const group = await Group.findById(groupId);
    if (group.members.includes(userId)) {
      return res.status(400).json({ message: 'Usuário já faz parte do grupo.' });
    }

    // Adiciona o usuário ao grupo
    await Group.findByIdAndUpdate(groupId, {
      $push: { members: userId },
    });

    // Adiciona o grupo ao usuário
    await User.findByIdAndUpdate(userId, {
      $push: { groups: groupId },
    });

    const updatedGroup = await Group.findById(groupId);
    res.json(updatedGroup);
  } catch (error) {
    console.error('Erro ao processar a participação no grupo:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

exports.getMyGroups = async (req, res) => {
  try {
   const groups = await Group.find({
    members: {
      $elemMatch: {
        user: req.user.id,
      },
    },
  });
    res.json(groups);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
