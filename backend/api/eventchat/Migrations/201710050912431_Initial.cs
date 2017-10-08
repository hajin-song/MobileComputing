namespace eventchat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comment",
                c => new
                    {
                        CommentID = c.Int(nullable: false, identity: true),
                        Content = c.String(nullable: false),
                        Date = c.DateTime(nullable: false),
                        Longitude = c.Double(nullable: false),
                        Latitude = c.Double(nullable: false),
                        UserID = c.Int(),
                        EventID = c.Int(),
                    })
                .PrimaryKey(t => t.CommentID)
                .ForeignKey("dbo.Event", t => t.EventID)
                .ForeignKey("dbo.User", t => t.UserID)
                .Index(t => t.UserID)
                .Index(t => t.EventID);
            
            CreateTable(
                "dbo.Event",
                c => new
                    {
                        EventID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 100),
                        Detail = c.String(nullable: false),
                        Date = c.DateTime(nullable: false),
                        Longitude = c.Double(nullable: false),
                        Latitude = c.Double(nullable: false),
                        type_EventTypeID = c.Int(),
                    })
                .PrimaryKey(t => t.EventID)
                .ForeignKey("dbo.EventType", t => t.type_EventTypeID)
                .Index(t => t.type_EventTypeID);
            
            CreateTable(
                "dbo.Image",
                c => new
                    {
                        ImageID = c.Int(nullable: false, identity: true),
                        imageURL = c.String(nullable: false),
                        Event_EventID = c.Int(),
                        Comment_CommentID = c.Int(),
                    })
                .PrimaryKey(t => t.ImageID)
                .ForeignKey("dbo.Event", t => t.Event_EventID)
                .ForeignKey("dbo.Comment", t => t.Comment_CommentID)
                .Index(t => t.Event_EventID)
                .Index(t => t.Comment_CommentID);
            
            CreateTable(
                "dbo.EventType",
                c => new
                    {
                        EventTypeID = c.Int(nullable: false, identity: true),
                        Type = c.String(nullable: false),
                        Level = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.EventTypeID);
            
            CreateTable(
                "dbo.User",
                c => new
                    {
                        UserID = c.Int(nullable: false, identity: true),
                        UserName = c.String(nullable: false, maxLength: 450),
                        Password = c.String(nullable: false, maxLength: 100),
                        FirstName = c.String(nullable: false, maxLength: 50),
                        LastName = c.String(nullable: false, maxLength: 50),
                        DateOfBirth = c.DateTime(nullable: false),
                        Authority = c.Boolean(nullable: false),
                        Address = c.String(nullable: false, unicode: false),
                        Id = c.String(),
                    })
                .PrimaryKey(t => t.UserID)
                .Index(t => t.UserName, unique: true);
            
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
            DropForeignKey("dbo.Comment", "UserID", "dbo.User");
            DropForeignKey("dbo.Image", "Comment_CommentID", "dbo.Comment");
            DropForeignKey("dbo.Event", "type_EventTypeID", "dbo.EventType");
            DropForeignKey("dbo.Image", "Event_EventID", "dbo.Event");
            DropForeignKey("dbo.Comment", "EventID", "dbo.Event");
            DropIndex("dbo.User", new[] { "UserName" });
            DropIndex("dbo.Image", new[] { "Comment_CommentID" });
            DropIndex("dbo.Image", new[] { "Event_EventID" });
            DropIndex("dbo.Event", new[] { "type_EventTypeID" });
            DropIndex("dbo.Comment", new[] { "EventID" });
            DropIndex("dbo.Comment", new[] { "UserID" });
            DropTable("dbo.Value");
            DropTable("dbo.User");
            DropTable("dbo.EventType");
            DropTable("dbo.Image");
            DropTable("dbo.Event");
            DropTable("dbo.Comment");
        }
    }
}
