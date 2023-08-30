export interface UserProps {
    id: string;
    objectId:string;
    username: string;
    name: string;
    bio:  string;
    image: string;
}

export type Author = {
    _id?: string,
    id?: string,
    __v?: number,
    bio?: string,
    communities?: [],
    image: string,
    name: string,
    onboarded?: boolean,
    threads?: Array<string>,
    username?: string
  }
  
  export type Thread = {
    text: string,
    _id: string,        
    author: Author,
    __v?: number,
    community: any,
    parentId?: string,
    createdAt: string,
    children: Array<Thread>,
  }

  
interface Item {
  icon: string;
  title?:string;
  route?: string
}

export type Icon =  {
  name: string,
  size?: number,
  color?: string
}
export type Icons =  {
  rightIcon?: Icon, 
  leftIcon?:Icon 
};

export interface SettingItem {
  // item: Record<string, Item>
  icons: Icons;
  title?:string;
  description?: string;
  route?: string, 
  navigation?: any
  
}
  
  