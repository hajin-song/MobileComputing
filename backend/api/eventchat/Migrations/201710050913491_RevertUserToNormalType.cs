namespace eventchat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RevertUserToNormalType : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.User", "Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.User", "Id", c => c.String());
        }
    }
}
