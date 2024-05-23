var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
var formData =require('../model/formData').FormDataModel;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/saveFormData', (req, res) => {
  const data = req.body;
  const formDataInstance = new formData.FormDataModel(data)
  formDataInstance.save()
  .then((data)=>{
    res.send('Form data saved successfully');
  })
  .catch((err)=>{res.send(err)})
  
});
let formStorage = {};

router.post('/saveForm', (req, res) => {
  const formData = req.body;
  const formId = uuidv4();
  newformData = new formData.FormDataModel({formId, ...formData})
  newformData.save()
  // formStorage[formId] = formData;
  console.log('Saved Form Data:', formStorage);  // Debug log
  const shareableLink = `http://localhost:4200/form/${formId}`; // Update to your frontend URL
  res.send({ shareableLink });
});
router.post('/saveFormStructure', (req, res) => {
  const formFields = req.body;
  const formId = uuidv4();
  //formStorage[formId] = { formFields, submissions: [] };
  newdata={
    formId:formId,
    formLink:`http://localhost:4200/form/${formId}`,
    formTitle:formFields[0].formTitle,
    formFields:formFields,
    submissions:[]
  }
  newformData = new formData(newdata)
  newformData.save()
  
  console.log('Saved Form Structure:', newdata);  // Debug log
  const shareableLink = `http://localhost:4200/form/${formId}`; // Update to your frontend URL
  res.send({ shareableLink });
});
router.get('/getFormStructure/:formId', (req, res) => {
  const formId = req.params.formId;
  //const form = formStorage[formId];
  formData.findOne({formId:formId})
  .then((data)=>{res.send(data)})
  .catch((err)=>{res.send(err)})
});

router.post('/submitFormData/:formId', async (req, res) => {
  const formId = req.params.formId;
  const formdata = req.body;

  try {
    // Get FormDataModel from formData module
    const updatedData = await formData.findOneAndUpdate(
      { formId: formId },
      { $push: { submissions: formdata } },
      { new: true } // Return the modified document
    );

    if (!updatedData) {
      throw new Error('Form data not found');
    }

    res.send("Form data submitted successfully");
    console.log(updatedData);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
router.get('/getAllSubmissions/:formId', (req, res) => {
  const formId = req.params.formId;
  formData.findOne({formId:formId})
  .then((data)=>{res.send(data),console.log(data)})
  .catch((err)=>res.send(err))
});

router.get("/getAllForms",(req,res)=>{
  formData.find()
  .then((data)=>res.send(data))
  .catch((err)=>res.send(err))
})

router.delete("/deleteForm/:formId",(req,res)=>{
  const formId = req.params.formId;
  formData.deleteOne({formId:formId})
  .then((data)=>res.send(data))
  .catch((err)=>res.send(err))
})

module.exports = router;
