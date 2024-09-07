import Users from "./users"

function List_users() {
  return <>  
      <section className="box-list-users">
          <span>Danh sách người dùng</span>
          <div className="scroll-users">
              <ul>
                  <Users />
                  <Users />
                  <Users />
                  <Users />
                  <Users />
                  <Users />
                  <Users />
                  <Users />
                 
              </ul>
          </div>
      </section>
  </>
}

export default List_users
