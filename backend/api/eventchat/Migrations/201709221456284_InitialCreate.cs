namespace eventchat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Value",
                c => new
                    {
                        ValueID = c.Int(nullable: false, identity: true),
                        ValueField = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ValueID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Value");
        }
    }
}
