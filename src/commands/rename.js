export default function rename(todoStore,params) {
    const [id,title] = params;
    let foundIndex = null;
    const [foundTODO] = list(todoStore).filter((item,index)=>{
          if(item.id==id){
            foundIndex = index;
            return true;
          } 
        });
    
    if(foundTODO){    
      foundTODO.title = title;
      const todos = todoStore.get()
      todos.splice(foundIndex,1,foundTODO);
      todoStore.set(todos)
    }
    return foundTODO;
  }