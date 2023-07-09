const asyncHandler = require("express-async-handler");

const User = require("../models/userModels");

const Ticket = require("../models/ticketModel");

//@desc     Get tickets
//@route    GET api/tickets
//@access   Private
const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

//@desc     Get ticket
//@route    GET api/ticket/:id
//@access   Private
const getTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
  
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
  
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        res.status(404)
        throw new Error('ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401);
      throw new Error("Not Authorized");
    }

    res.status(200).json(ticket);
  });

//@desc     update ticket
//@route    PUT api/ticket/:id
//@access   Private
const updateTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
  
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
  
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        res.status(404)
        throw new Error('ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401);
      throw new Error("Not Authorized");
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedTicket);
  });  

//@desc     delete ticket
//@route    DELETE api/ticket/:id
//@access   Private
const deleteTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
      }
 
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        res.status(404)
        throw new Error('ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401);
      throw new Error("Not Authorized");
    }

    await Ticket.findByIdAndRemove(req.params.id);

    res.status(200).json({success : true});
  });
   
  
//@desc     create new ticket
//@route    POST api/tickets
//@access   Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and a description");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new'
  })

  res.status(201).json(ticket);
});

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket
};
