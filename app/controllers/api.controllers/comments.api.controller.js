const commentsApiController = (data, utils) => {
    return {
        editDestinationComment(req, res) {
            const isAdmin = req.user.isAdmin;
            if (isAdmin) {
                const comment = req.body;
                const id = req.body.id;

                return data.landmarks.findById(id)
                    .then((landmark) => {
                        const commentToUpdate = landmark.comments
                            .find((x) => x.text === comment.oldText);

                        if (typeof (commentToUpdate) === 'undefined') {
                            return Promise.reject('Not Find');
                        }

                        commentToUpdate.text = comment.newText;
                        return data.landmarks.update(landmark);
                    })
                    .then((response) => {
                        return res.send('Its Ok');
                    })
                    .catch((x) => {});
            }
            return res.status(401)
                .send('You are not admin');
        },
        addDestinationComment(req, res) {
            if (!req.user) {
                return res
                    .status(401)
                    .send('You must be logged in in order to comment!');
            }

            const landmarkId = req.params.id;
            const comment = req.body;
            comment.user = {
                username: req.user.username,
                _id: req.user._id,
                pictureUrl: req.user.pictureUrl,
            };

            return data.landmarks.findById(landmarkId)
                .then((landmark) => {
                    if (landmark === null) {
                        return res.status(404)
                            .send('Landmark not found!');
                    }

                    return data.landmarks.addComment(landmark, comment);
                })
                .then((newComment) => {
                    return res.status(201)
                        .send(newComment);
                })
                .catch((errMessage) => {
                    return res.status(400)
                        .send(errMessage);
                });
        },
        deleteDestinationComment(req, res) {
            const isAdmin = req.user && req.user.isAdmin;
            const landmarkId = req.params.id;

            const commentText = req.body.text;

            return data.landmarks.findById(landmarkId)
                .then((landmark) => {
                    if (landmark === null) {
                        return res.status(404)
                            .send('Landmark does not exist');
                    }

                    const index = landmark.comments
                        .findIndex((c) => c.text === commentText);
                    if (index < 0) {
                        return res.status(404)
                            .send('No such comment!');
                    }

                    if (landmark.comments[index].user.username !==
                        req.user.username &&
                        !isAdmin) {
                        return res
                            .status(401)
                            .send('You must be an admin in order to delete ');
                    }

                    landmark.comments.splice(index, 1);
                    return data.landmarks.update(landmark);
                }).then((result) => {
                    return res
                        .status(200)
                        .send(result);
                })
                .catch((err) => {});
        },
    };
};

module.exports = commentsApiController;
