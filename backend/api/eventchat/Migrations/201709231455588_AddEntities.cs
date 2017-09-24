namespace eventchat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddEntities : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comment",
                c => new
                    {
                        CommentID = c.Int(nullable: false, identity: true),
                        comment = c.String(),
                        date = c.DateTime(nullable: false),
                        image_ImageID = c.Int(),
                    })
                .PrimaryKey(t => t.CommentID)
                .ForeignKey("dbo.Image", t => t.image_ImageID)
                .Index(t => t.image_ImageID);
            
            CreateTable(
                "dbo.Image",
                c => new
                    {
                        ImageID = c.Int(nullable: false, identity: true),
                        imageURL = c.String(),
                        Event_EventID = c.Int(),
                    })
                .PrimaryKey(t => t.ImageID)
                .ForeignKey("dbo.Event", t => t.Event_EventID)
                .Index(t => t.Event_EventID);
            
            CreateTable(
                "dbo.Event",
                c => new
                    {
                        EventID = c.Int(nullable: false, identity: true),
                        name = c.String(),
                        type = c.Int(),
                        longitude = c.Double(nullable: false),
                        latitude = c.Double(nullable: false),
                        details = c.String(),
                        date = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.EventID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Image", "Event_EventID", "dbo.Event");
            DropForeignKey("dbo.Comment", "image_ImageID", "dbo.Image");
            DropIndex("dbo.Image", new[] { "Event_EventID" });
            DropIndex("dbo.Comment", new[] { "image_ImageID" });
            DropTable("dbo.Event");
            DropTable("dbo.Image");
            DropTable("dbo.Comment");
        }
    }
}
