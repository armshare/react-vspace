var END_POINT_2 = 'http://vspace.in.th/apis/';
var Url = {
  'info':END_POINT_2+"v1/user/header",
  'projectDetail':END_POINT_2+"v1/projectplan/projectdetail",
  'listCaseAll':END_POINT_2+"v1/casetype/listCaseAll",
  'project':END_POINT_2+"v1/projectplan/projectlist",
  'login':END_POINT_2+'v1/user/login',
  'editOwnerCase':END_POINT_2+'v1/casemodify/owner',
  'casemodifySubject':END_POINT_2+'v1/casemodify/subject',
  'caseCreate':END_POINT_2+'v1/casemanagement/createCasesProjectPlan',
  'caseRemove':END_POINT_2+'v1/casemodify/removeCase',
  'findContractInfo': END_POINT_2+'v1/contract/find_contract_info',
  'projectCreate': END_POINT_2+'v1/project/ProjectCreate',
  'addProjectContact': END_POINT_2+'v1/projectmodify/addProjectContact'
}

export default Url;
