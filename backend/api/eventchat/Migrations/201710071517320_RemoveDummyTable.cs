namespace eventchat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveDummyTable : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.Value");
        }
        
        public override void Down()
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
    }
}
