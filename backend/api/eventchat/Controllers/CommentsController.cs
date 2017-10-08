using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using eventchat.DAL;
using eventchat.Models;
using eventchat.Models.Wrappers;

// UN-IMPLEMENTED PART OF THE APPLICATION
namespace eventchat.Controllers
{
    [RoutePrefix("api/comments")]
    [Authorize]
    public class CommentsController : ApiController
    {
        private EventChatContext db = new EventChatContext();

        // GET: api/Comments/5
        [Route("get")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult GetComment(int id)
        {
            Comment comment = db.Comments.Find(id);
            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        // POST: api/Comments
        [Route("post")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult PostComment(CommentPost comment)
        {
            return CreatedAtRoute("DefaultApi", new { id = comment.CommentID }, comment);
        }

        // DELETE: api/Comments/5
        [Route("destroy")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult DeleteComment(CommentPost comment)
        {
            return Ok(comment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CommentExists(int id)
        {
            return db.Comments.Count(e => e.CommentID == id) > 0;
        }
    }
}