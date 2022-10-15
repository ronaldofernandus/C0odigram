```bash

  npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string,bio:string,image:string

  npx sequelize-cli model:generate --name Post --attributes image:string,caption:string,UserId:integer

```