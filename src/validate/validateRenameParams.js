
export default function validateRenameParams(params) {
    //It has two params, an ID and the new title as a string.
    const [id,title] = params;
    /* The ID should be numeric and 
    a string should be at least 1 character long or 
    a meaningful error should be shown to the user.
    */
    if(
      isNaN(+id)||
      typeof(title)!="string"||
      title.length<1
      ){
      throw new AppError('The ID should be numeric and the title should be at least 1 character long!')
    }
    return params;
  }