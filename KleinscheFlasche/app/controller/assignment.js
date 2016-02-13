/**
 * Created by Administrator on 2016/1/4.
 */
//学生作业
exports.work = function (req, res) {
    res.json({
        imgUrl: '/images/test/touxiang.jpg',
        works: [
            {
                url: '/www',
                workName: 'XX课程作业1'
            },
            {
                url: '/www',
                workName: 'XX课程作业2'
            }
            ,
            {
                url: '/www',
                workName: 'XX课程作业3'
            }
            ,
            {
                url: '/www',
                workName: 'XX课程作业4'
            }
            ,
            {
                url: '/www',
                workName: 'XX课程作业5'
            }
            ,
            {
                url: '/www',
                workName: 'XX课程作业6'
            }
        ],
        worked: [
            {
                url: '/www',
                workName: 'XX课程作业X'
            },
            {
                url: '/www',
                workName: 'XX课程作业X'
            }
            ,
            {
                url: '/www',
                workName: 'XX课程作业X'
            }
            ,
            {
                url: '/www',
                workName: 'XX课程作业X'
            }
            ,
            {
                url: '/www',
                workName: 'XX课程作业X'
            }
            ,
            {
                url: '/www',
                workName: 'XX课程作业x'
            }
        ],
        next:'XXX课程XXX时间XXX地点'

    })
}