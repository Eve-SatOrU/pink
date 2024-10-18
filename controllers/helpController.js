const HelpRequest = require('../models/HelpRequest');

exports.submitHelpRequest = async (req, res) => {
  const sessionUser = req.session.user;

  if (!sessionUser) {
    return res.status(401).json({ error: 'You need to be logged in to submit a help request' });
  }
  const userName = sessionUser.userName;
  const email = sessionUser.email;
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'The question field is required' });
  }

  try {
    const helpRequest = await HelpRequest.create({
      userName,
      email,
      question
    });

    res.status(201).json({ message: 'Help request submitted successfully', helpRequest });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit help request' });
  }
};


// exports.getHelpRequestStatus = async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       const helpRequest = await HelpRequest.findByPk(id, {
//         attributes: ['status']
//       });
  
//       if (!helpRequest) {
//         return res.status(404).json({ error: 'Help request not found' });
//       }
  
//       res.status(200).json({ status: helpRequest.status });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to retrieve help request status' });
//     }
//   };

