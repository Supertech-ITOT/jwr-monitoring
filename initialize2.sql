INSERT INTO rooms (id, name)
VALUES
(1, 'Positive Room'),
(2, 'Negative Room'),
(3, 'Mezzanine Room'),
(4, 'Ante Room'),
(5, 'Truckdock Room'),
(6, 'Evaporative Condenser'),
(7, 'Positive Compressor'),
(8, 'Negative Compressor'),
(9, 'LP Receiver'),
(10, 'Chilled Water');

INSERT INTO tag_master (
    ip_address,
    node_id,
    tag_name,
    parameter_id,
    room_id
)
SELECT
    'opc.tcp://127.0.0.1:48010' AS ip_address,
    'ns=2;s=Studio.Tags.Application.' || r.name || '_' || t.suffix AS node_id,
    r.name || '_' || t.suffix AS tag_name,
    t.parameter_id,
    r.id
FROM rooms r
CROSS JOIN (
    VALUES

        ('KWH',2),
        ('CURRENT',4),
        ('VOLTAGE',5)

) AS t(suffix, parameter_id)
WHERE r.id BETWEEN 63 AND 78
ORDER BY r.id;