const express = require('express');
const router = express.Router();
const Puzzle = require('../../models/puzzle');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ extended: false });

const {checkAdmin, checkAuth, checkManager} = require('../../config/passport');


function responseWithError(err, status, res) {
    res.status(status).json({
        err
    });
}


router.post('',  jsonParser, async (req, res) => {
    try {
        const response = await Puzzle.getFilteredSearch(req.body);
        res.json(response);
    } catch (err) {
        responseWithError(err, 500, res);
    }
});

router.get('/all', async (req, res) => {
    try {
        const puzzles = await Puzzle.getAll();
        res.json(puzzles);
    } catch (err) {
        responseWithError(err, 500, res);
    }
});

router.get('/:id([\\da-z]{24})', async (req, res) => {
    const puzzle_id = req.params.id
    try {
        const puzzle = await Puzzle.getById(puzzle_id);
        if (!puzzle)
            res.status(404).json({
                err: 'No puzzle with such id'
            });
        else 
            res.json(puzzle);

    } catch (err) {
        res.sendStatus(500);
    }
});

router.delete('/:id([\\da-z]+)', checkAuth, checkManager, async (req, res) => {
    try {
        const puzzleId = req.params.id;
        const result = await Puzzle.deleteById(puzzleId);
        res.json(result);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/new/mp',  checkAuth, checkManager ,async (req, res) => {
    const puzzle = await Puzzle.getPuzzleFromFormRequest(req);
    try {
        const insertedPuzzle = await Puzzle.insert(puzzle);
        res.status(201).send({
            puzzle: insertedPuzzle
        });
    } catch (err) {
        responseWithError(err, 500, res);
    }

});

router.patch('/:id([\\da-z]{,24})', checkAuth, checkManager, async (req, res) => {
    const puzzle = await Puzzle.getPuzzleFromFormRequest(req);

    const puzzleId = req.params.id;
    puzzle._id = puzzleId;
    
    try {
        Puzzle.update(puzzle);
    } catch {
        res.sendStatus(500);
    }
});

router.get('/filters', async (req, res) => {
    try {
        const filters = await Puzzle.getFilters();
        res.json(filters);
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;