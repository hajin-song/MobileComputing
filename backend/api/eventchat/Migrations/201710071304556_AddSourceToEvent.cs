namespace eventchat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddSourceToEvent : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Event", "Source", c => c.String());
            AddColumn("dbo.Event", "user_UserID", c => c.Int());
            CreateIndex("dbo.Event", "user_UserID");
            AddForeignKey("dbo.Event", "user_UserID", "dbo.User", "UserID");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Event", "user_UserID", "dbo.User");
            DropIndex("dbo.Event", new[] { "user_UserID" });
            DropColumn("dbo.Event", "user_UserID");
            DropColumn("dbo.Event", "Source");
        }
    }
}
