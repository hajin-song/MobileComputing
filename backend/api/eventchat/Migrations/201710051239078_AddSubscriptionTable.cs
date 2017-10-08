namespace eventchat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddSubscriptionTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Subscription",
                c => new
                    {
                        SubscriptionID = c.Int(nullable: false, identity: true),
                        subscribedUser_UserID = c.Int(),
                        subscriptionUser_UserID = c.Int(),
                    })
                .PrimaryKey(t => t.SubscriptionID)
                .ForeignKey("dbo.User", t => t.subscribedUser_UserID)
                .ForeignKey("dbo.User", t => t.subscriptionUser_UserID)
                .Index(t => t.subscribedUser_UserID)
                .Index(t => t.subscriptionUser_UserID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Subscription", "subscriptionUser_UserID", "dbo.User");
            DropForeignKey("dbo.Subscription", "subscribedUser_UserID", "dbo.User");
            DropIndex("dbo.Subscription", new[] { "subscriptionUser_UserID" });
            DropIndex("dbo.Subscription", new[] { "subscribedUser_UserID" });
            DropTable("dbo.Subscription");
        }
    }
}
